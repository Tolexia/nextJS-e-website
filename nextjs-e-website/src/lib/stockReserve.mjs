import { readStock, stockAfterRelease, stockAfterReserve } from "./stock.mjs";

function conflict(message) {
  const error = new Error(message);
  error.status = 409;
  return error;
}

export async function reserveProductStock(db, productId, quantity) {
  const result = await db.ref(`shoes/${productId}/stock`).transaction((current) => {
    const next = stockAfterReserve(current, quantity);
    if (next === null) {
      return;
    }
    return next;
  });

  if (!result.committed) {
    const snapshot = await db.ref(`shoes/${productId}/stock`).get();
    const stock = snapshot.exists() ? readStock(snapshot.val()) : null;
    throw conflict(stock === null ? "Stock non renseigné pour un article" : "Stock insuffisant");
  }
}

export async function releaseProductStock(db, productId, quantity) {
  await db.ref(`shoes/${productId}/stock`).transaction((current) => {
    const next = stockAfterRelease(current, quantity);
    if (next === null) {
      return;
    }
    return next;
  });
}

export async function releaseReservedStock(db, orderId) {
  const orderRef = db.ref(`orders/${orderId}`);
  const snapshot = await orderRef.get();
  if (!snapshot.exists()) {
    return;
  }

  const order = snapshot.val();
  if (order.status === "payée" || !Array.isArray(order.items)) {
    return;
  }

  for (const line of order.items) {
    if (!line || typeof line.id !== "string" || !Number.isInteger(line.quantity) || line.quantity < 1) {
      continue;
    }

    const marker = orderRef.child(`restored/${line.id}`);
    const claim = await marker.transaction((current) => (current === true ? undefined : true));
    if (!claim.committed) {
      continue;
    }

    const restored = await db.ref(`shoes/${line.id}/stock`).transaction((current) => {
      const next = stockAfterRelease(current, line.quantity);
      if (next === null) {
        return;
      }
      return next;
    });

    if (!restored.committed) {
      await marker.set(false);
    }
  }
}

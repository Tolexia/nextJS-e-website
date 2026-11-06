import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const PROJECT_ID = "nextjs-e-website";
const ADMIN_UID = "HCydGlgDx3gJRpvtnvEWeV9sx7A3";
const ADMIN_EMAIL = "axelcroizepro@gmail.com";

const CLI_CLIENT_ID = "563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com";
const CLI_CLIENT_SECRET = "j9iVZfS8kkCEFUPaAeJV0sAi";

const readCliTokens = () => {
  const configPath = join(homedir(), ".config", "configstore", "firebase-tools.json");
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  if (!config.tokens?.refresh_token) {
    throw new Error("Session Firebase CLI absente. Lance firebase login.");
  }
  return config.tokens;
};

const getAccessToken = async () => {
  const tokens = readCliTokens();
  if (tokens.access_token && tokens.expires_at > Date.now() + 60_000) {
    return tokens.access_token;
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLI_CLIENT_ID,
      client_secret: CLI_CLIENT_SECRET,
      refresh_token: tokens.refresh_token,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    throw new Error(`Impossible de rafraîchir la session Firebase CLI (${response.status}).`);
  }

  const data = await response.json();
  return data.access_token;
};

const writeAdminDocument = async (accessToken) => {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${encodeURIComponent("(default)")}/documents/users/${ADMIN_UID}?updateMask.fieldPaths=email&updateMask.fieldPaths=is_admin`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        email: { stringValue: ADMIN_EMAIL },
        is_admin: { booleanValue: true },
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Écriture Firestore refusée (${response.status}) : ${detail}`);
  }
};

const setAdminClaim = async (accessToken) => {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${PROJECT_ID}/accounts:update`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      localId: ADMIN_UID,
      customAttributes: JSON.stringify({ admin: true }),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Claim admin refusé (${response.status}) : ${detail}`);
  }
};

const readAdminClaim = async (accessToken) => {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${PROJECT_ID}/accounts:lookup`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ localId: [ADMIN_UID] }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Lecture du claim refusée (${response.status}) : ${detail}`);
  }

  const data = await response.json();
  return data.users?.[0]?.customAttributes ?? null;
};

const accessToken = await getAccessToken();
await writeAdminDocument(accessToken);
await setAdminClaim(accessToken);
const customAttributes = await readAdminClaim(accessToken);

console.log(`Document users/${ADMIN_UID} écrit avec is_admin=true.`);
console.log(`Claim Auth : ${customAttributes}`);

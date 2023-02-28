import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
      await saveFiles(files.files);
    return res.status(201).send("");
  });
};

const saveFiles = async (files) => {
  files.forEach(file => {
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`./public/images/${file.originalFilename}`, data);
    fs.unlinkSync(file.filepath);
  })
  return;
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};

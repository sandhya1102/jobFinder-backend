import multer from "multer";

const storage = multer.memoryStorage();
export const uploadLogo = multer({ storage }).single("logo");
export const uploadProfileImage = multer({ storage }).single("file");
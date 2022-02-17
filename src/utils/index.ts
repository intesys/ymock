/* ---------------------------------
utils
--------------------------------- */

export function stripBasePath(path: string): string {
  if (!path) return "";

  if (!path.includes("/")) return path;

  return "/" + stripProtocol(path).split("/").slice(1).join("/");
}

export function stripProtocol(path: string): string {
  if (!path) return "";

  return path.replace(/http[s]?:\/\//, "");
}

module.exports = {
  stripProtocol,
  stripBasePath,
};

import stringify from "json-stable-stringify";

export default (obj: Parameters<typeof stringify>[0]): string => {
  if (Array.isArray(obj) && obj.length === 0) {
    return "[]";
  } else if (typeof obj === "object" && Object.keys(obj).length === 0) {
    return "{}";
  }

  return stringify(obj, { space: 2 });
};

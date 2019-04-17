import stringify from "json-stable-stringify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (obj: any): string => {
  if (Array.isArray(obj) && obj.length === 0) {
    return "[]";
  } else if (typeof obj === "object" && Object.keys(obj).length === 0) {
    return "{}";
  }

  return stringify(obj, { space: 2 });
};

import BaseGenerator from "../common/base-generator";

function getFromPackageJson(gen: BaseGenerator): string {
  try {
    const author: Wup.Name | Wup.Person = (gen.fs.readJSON(
      gen.destinationPath("package.json")
    ) as Wup.PackageJson).author;

    if (!author) {
      return "";
    }

    if (typeof author === "string") {
      return author;
    } else {
      return author.name;
    }
  } catch (e) {}

  return "";
}

export function getAuthorName(gen: BaseGenerator): string {
  return (
    getFromPackageJson(gen) ||
    // If the default author name can be found by "config", then the following
    // will return it
    (gen.getProp("config:author:name") as string)
  );
}

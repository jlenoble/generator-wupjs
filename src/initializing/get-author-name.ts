import BaseGenerator from "../common/base-generator";

function getFromPackageJson(gen: BaseGenerator): string {
  try {
    const author: Wup.Name | Wup.Person = gen.fs.readJSON(
      gen.destinationPath("package.json")
    ).author;

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
  return getFromPackageJson(gen);
}

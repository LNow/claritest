export type StringCV = StringAsciiCV | StringUtf8CV;

export interface StringAsciiCV {
  readonly data: string;
}

export interface StringUtf8CV {
  readonly data: string;
}

export function stringAsciiCV(data: string): StringAsciiCV {
  return { data: data };
}

export function stringUtf8CV(data: string): StringUtf8CV {
  return { data: data };
}

export function stringCV(
  data: string,
  encoding: "ascii" | "utf8",
): (StringAsciiCV | StringUtf8CV) {
  switch (encoding) {
    case "ascii":
      return stringAsciiCV(data);
    case "utf8":
      return stringUtf8CV(data);
  }
}

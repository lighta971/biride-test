export function camelizeObjectKeys(
  object: Record<string, any>
): Record<string, any> {
  return Object.entries(object).reduce(
    (carry: Record<string, any>, [key, value]) => {
      carry[camelize(key)] = value;

      return carry;
    },
    {}
  );
}

function camelize(text: string): string {
  const a = text
    .toLowerCase()
    .replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
  return a.substring(0, 1).toLowerCase() + a.substring(1);
}

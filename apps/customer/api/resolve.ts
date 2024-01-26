export const resolve = async (promise: Promise<any>) => {
  const resolved: any = {
    data: null,
    error: null
  };
  try {
    const res = await promise
    Object.assign(resolved, { ...res, data: res?.data });
  } catch (e: any) {
    Object.assign(resolved, { ...e?.response, error: e?.response?.data, data: null });
    console.error(e);
  }

  return resolved;
}
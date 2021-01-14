import { getStorage } from "~/lib/Storage"

const getToken = async () => {
  const item = await getStorage('polypoid-token');
  return JSON.parse(String(item));
}

export default getToken;
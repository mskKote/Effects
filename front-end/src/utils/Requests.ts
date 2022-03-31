import IContentPage from "../interfaces/IContentPage"

class Requests {

  URL = process.env.NODE_ENV === "production" ?
    "https://effects.vercel.app" :
    "http://localhost:3000"

  async publishPage(contentPage: IContentPage): Promise<string> {
    const requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contentPage),
      redirect: 'follow' as RequestRedirect
    };
    const result = await fetch(`${this.URL}/api/page`, requestOptions)
      .then(response => response.json())
      .catch(console.error);
    console.log(result)

    return result["@ref"]?.id ?? "Ошибка! Не получилось опубликовать"
  }

  async getPage(pageId: string): Promise<IContentPage | string> {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow' as RequestRedirect
    };
    const result = await fetch(`${this.URL}/api/page/${pageId}`, requestOptions)
      .then(response => response.json())
      .catch(console.error);

    return result.data ?? "ERROR"
  }
}
export default new Requests()
import IBookPage from "@interfaces/IBookPage";

class Requests {
  async publishPage(contentPage: IBookPage): Promise<string> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contentPage),
      redirect: "follow" as RequestRedirect,
    };
    const result = await fetch(`/api/page`, requestOptions)
      .then((response) => response.json())
      .catch(console.error);

    return result["@ref"]?.id ?? "Ошибка! Не получилось опубликовать";
  }

  async getPage(pageId: string): Promise<IBookPage | null> {
    const requestOptions = {
      method: "GET",
      redirect: "follow" as RequestRedirect,
    };
    const result = await fetch(`/api/page/${pageId}`, requestOptions)
      .then((response) => response.json())
      .catch(console.error);

    return result?.data ?? null;
  }
}

const requests = new Requests();

export default requests;

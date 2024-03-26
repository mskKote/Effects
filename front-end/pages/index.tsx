import React from "react";
import type { NextPage, GetServerSideProps } from "next";
import { YMInitializer } from "react-yandex-metrika";
import { EEffects } from "../src/interfaces/IEffects";
import EffectsSettings from "../src/components/effectsSettigns/EffectsSettings";
import HeadSEO from "../src/utils/HeadSEO";
import Layers from "../src/components/layers/Layers";
import LayersSettings from "../src/components/layers/LayersSettings";
import IContentPage, { ELanguages } from "../src/interfaces/IContentPage";
import EditorHeader from "../src/components/header/EditorHeader";
import Loader from "../src/components/loader/Loader";
import styles from "../styles/Editor.module.scss";
import Requests from "../src/utils/Requests";
import cn from "classnames";

//#region Mock
const mockData: IContentPage = {
  layers: [
    {
      content: {
        [ELanguages.ru_RU]: { name: "Задний фонк", url: "/mock/p1.png" },
      },
      effects: {
        [EEffects.parallax]: { value: 0.5 },
        [EEffects.blur]: { value: 2.5 },
      },
    },
    {
      content: {
        [ELanguages.ru_RU]: { name: "Персонаж", url: "/mock/Scott-p1.png" },
      },
      effects: {
        [EEffects.parallax]: { value: 0.6 },
      },
    },
  ],
};
//#endregion

type Props = {
  page: IContentPage;
  isEdit: boolean;
  resolvedUrl: string;
};

const Editor: NextPage<Props, {}> = ({ page, isEdit, resolvedUrl }) => {
  const [editMode, setEditMode] = React.useState<boolean>(isEdit);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [currentLayer, setCurrentLayer] = React.useState(0);
  const [contentPage, setContentPage] = React.useState(page);
  const [currentLanguage, setCurrentLanguage] = React.useState(
    ELanguages.ru_RU
  );

  //* Загрузка контента
  React.useEffect(() => {
    const url = new URL(window.location.href);
    const isEdit =
      url.searchParams.has("edit") || url.searchParams.get("id") === null;
    setEditMode(isEdit);
    setTimeout(() => setLoading(false), 400);
  }, []);

  //* Пока чудо не произошло, показываем загрузку
  if (editMode === undefined || loading) return <Loader />;

  return (
    <div
      className={cn(styles.editorContainer, {
        [styles.editorTime]: editMode,
        [styles.showTime]: !editMode,
      })}
    >
      <HeadSEO
        title="Effects"
        description="Manga&comics with effects"
        keywords={["Comics", "manga", "effects", "parallax", "2.5d"]}
        author="🔮 Effects team"
        iconImg="/icon.svg"
        socialNetworkImg="/icon.svg"
      />

      {/* Yandex.Metrika counter */}
      <YMInitializer
        version="2"
        accounts={[88113924]}
        options={{
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          trackHash: true,
        }}
      />

      {/* Поле для публикации и аккаунта */}
      {editMode && <EditorHeader contentPage={contentPage} />}

      {/* Настроки эффектов */}
      {editMode && (
        <EffectsSettings
          contentPage={contentPage}
          setContentPage={setContentPage}
          currentLayer={currentLayer}
        />
      )}

      {/* Сами слои */}
      <Layers contentPage={contentPage} currentLanguage={currentLanguage} />

      {/* Настройки слоёв */}
      {editMode && (
        <LayersSettings
          contentPage={contentPage}
          setContentPage={setContentPage}
          currentLayer={currentLayer}
          setCurrentLayer={setCurrentLayer}
        />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  resolvedUrl,
}) => {
  //* Установка значений
  const id = query["id"] as string;
  let isEdit = Object.prototype.hasOwnProperty.call(query, "edit");
  if (id === undefined) isEdit = true;
  let page: IContentPage | string = mockData;
  console.log("getServerSideProps :>> ", query, id, isEdit, resolvedUrl);

  //* Получение контента
  if (id) {
    page = await Requests.getPage(id);
    console.log("page", page);
    //* Контента не существует → редирект на 404
    if (page === "ERROR")
      return { redirect: { destination: "/404", permanent: true } };
    //* Контента не существует, но хотим в редактор → попадаем в редактор
    else if (page === "ERROR" && isEdit) page = mockData;
  }

  return { props: { page, isEdit, resolvedUrl } };
};

export default Editor;

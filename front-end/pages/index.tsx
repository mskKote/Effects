import React from "react";
import type { NextPage, GetServerSideProps } from "next";
import { YMInitializer } from "react-yandex-metrika";
import { EEffects } from "../src/interfaces/IEffects";
import HeadSEO from "../src/utils/HeadSEO";
import Layers from "../src/components/layers/Layers";
import IContentPage, { ELanguages } from "../src/interfaces/IContentPage";
import styles from "../styles/Editor.module.scss";
import Requests from "../src/utils/Requests";
import cn from "classnames";
import Loader from "../src/components/loader/Loader";
const LazyEditor = React.lazy(() => import("../src/components/editor/Editor"));

//#region Mock
const mockData: IContentPage = {
  layers: [
    {
      position: 0,
      content: {
        [ELanguages.ru_RU]: { name: "Задний фонк", url: "/mock/p1.png" },
      },
      effects: {
        [EEffects.parallax]: { value: 0.5 },
        [EEffects.blur]: { value: 2.5 },
      },
    },
    {
      position: 1,
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
  isEditMode: boolean;
};
const Index: NextPage<Props, {}> = ({ page, isEditMode }) => {
  const [contentPage, setContentPage] = React.useState(page);
  // TODO: i18n
  const [lang, setLang] = React.useState(ELanguages.ru_RU);
  const [isEdit, setIsEdit] = React.useState(isEditMode);

  const [isParallax, setIsParallax] = React.useState(
    contentPage.layers.some((x) => x.effects.parallax?.value !== 0)
  );

  return (
    <div
      className={cn(styles.editorContainer, {
        [styles.editorTime]: isEditMode,
        [styles.showTime]: !isEditMode,
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
      {process.env.NODE_ENV === "production" && (
        <YMInitializer
          version="2"
          accounts={[Number(process.env.NEXT_PUBLIC_YANDEX_MAPS)]}
          options={{
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
            trackHash: true,
          }}
        />
      )}

      <button style={{ display: "none" }} onClick={() => setIsEdit((x) => !x)}>
        Toggle EDIT
      </button>
      <button
        style={{ display: "none" }}
        onClick={() => setIsParallax((x) => !x)}
      >
        Toggle PARALLAX
      </button>

      {isEdit ? (
        <React.Suspense fallback={<Loader />}>
          <LazyEditor
            lang={lang}
            page={contentPage}
            setContentPage={setContentPage}
          >
            <Layers
              key="layers"
              lang={lang}
              layers={contentPage.layers}
              isParallax={isParallax}
              parallaxes={contentPage.layers
                .map((x) => x.effects.parallax?.value ?? 0)
                .join()}
            />
          </LazyEditor>
        </React.Suspense>
      ) : (
        <Layers
          key="layers"
          lang={lang}
          layers={contentPage.layers}
          isParallax={isParallax}
          parallaxes={contentPage.layers
            .map((x) => x.effects.parallax?.value ?? 0)
            .join()}
        />
      )}
    </div>
  );
};

/**
 * id -> load the content
 *
 * TODO: переместить на отдельную страницу контента
 */
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query["id"] as string;
  const isEdit = !id || Object.prototype.hasOwnProperty.call(query, "edit");
  console.log(
    Object.prototype.hasOwnProperty.call(query, "edit"),
    !!Object.prototype.hasOwnProperty.call(query, "edit")
  );

  //* Без ID → попадаем в дефолт
  if (!id || id === "1")
    return { props: { page: mockData, isEditMode: isEdit } };

  //* Получение контента
  const page = await Requests.getPage(id);
  //* Контента не существует → редирект на 404
  if (!page) return { redirect: { destination: "/404", permanent: true } };
  //* Контента не существует, но хотим в редактор → попадаем в редактор
  else if (!page && isEdit)
    return { props: { page: mockData, isEditMode: isEdit } };

  return { props: { page, isEditMode: isEdit } };
};

export default Index;

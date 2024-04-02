import React from "react";
import type { NextPage, GetServerSideProps } from "next";
import { YMInitializer } from "react-yandex-metrika";
import HeadSEO from "@utils/HeadSEO";
import Layers from "@components/layers/Layers";
import IContentPage, { localeToContentLang } from "@interfaces/IContentPage";
import styles from "@root/styles/Index.module.scss";
import Requests from "@utils/Requests";
import cn from "classnames";
import Loader from "@components/loader/Loader";
import { mockPage } from "@utils/mock";
import { withTranslationProps } from "@utils/withTranslationProps";
import useLocale from "@utils/useLocale";
import { useTranslation } from "next-i18next";
import configuration from "@utils/configuration";
const LazyEditor = React.lazy(() => import("@components/editor/Editor"));

type Props = {
  page: IContentPage;
  isEditMode: boolean;
};
const Index: NextPage<Props, {}> = ({ page, isEditMode }) => {
  const [contentPage, setContentPage] = React.useState(page);
  const [isEdit, setIsEdit] = React.useState(isEditMode);
  const { locale } = useLocale();
  const { t } = useTranslation();
  const [lang, setLang] = React.useState(localeToContentLang(locale));

  return (
    <div
      className={cn(styles.editorContainer, {
        [styles.editorTime]: isEditMode,
        [styles.showTime]: !isEditMode,
      })}
    >
      <HeadSEO
        title={t("title")}
        description={t("description")}
        keywords={t("keywords").split(" ")}
        author="🔮 Effects team"
        iconImg="/icon.svg"
        socialNetworkImg="/icon.svg"
      />
      {/* Yandex.Metrika counter */}
      {configuration.production && (
        <YMInitializer
          version="2"
          accounts={[configuration.yandexMetrika]}
          options={{
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
            trackHash: true,
          }}
        />
      )}
      <button
        id="toggle-edit"
        style={{ display: "none" }}
        onClick={() => setIsEdit((x) => !x)}
      />
      {isEdit ? (
        <React.Suspense fallback={<Loader />}>
          <LazyEditor page={contentPage} setContentPage={setContentPage} />
        </React.Suspense>
      ) : (
        <Layers
          key="layers"
          lang={lang}
          layers={contentPage.layers}
          isParallax={true}
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
 * TODO: переместить на отдельную страницу контента
 */
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { props: translationProps } = await withTranslationProps(ctx);
  const id = ctx.query["id"] as string;
  const isEditMode =
    !id || Object.prototype.hasOwnProperty.call(ctx.query, "edit");

  const props = (page: IContentPage) => ({
    props: {
      page,
      isEditMode,
      ...translationProps,
    },
  });

  //* Без ID → попадаем в дефолт
  if (!id || id === "mskKote") return props(mockPage);

  //* Получение контента
  const page = await Requests.getPage(id);
  //* Контента не существует → редирект на 404
  if (!page) return { redirect: { destination: "/404", permanent: true } };
  //* Контента не существует, но хотим в редактор → попадаем в редактор
  else if (!page && isEditMode) return props(mockPage);

  return props(page);
};

export default Index;

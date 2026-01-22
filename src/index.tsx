import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [optionList, setOptionList] =
		useState<ArticleStateType>(defaultArticleState);
	const optionChange = (options: ArticleStateType) => {
		setOptionList(options);
	};
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': optionList.fontFamilyOption.value,
					'--font-size': optionList.fontSizeOption.value,
					'--font-color': optionList.fontColor.value,
					'--container-width': optionList.contentWidth.value,
					'--bg-color': optionList.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm optionChange={optionChange} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

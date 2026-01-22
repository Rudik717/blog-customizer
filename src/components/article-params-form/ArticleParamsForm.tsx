import { useState, useEffect, useRef, FormEvent } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';
import { RadioGroup } from '../../ui/radio-group';
import { Select } from '../../ui/select';
import { Separator } from '../../ui/separator';
import { Text } from '../../ui/text';

import styles from './ArticleParamsForm.module.scss';

type FormOptionsPropsType = {
	optionChange: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: FormOptionsPropsType) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [optionList, setOptionList] =
		useState<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const onOutsideClick = (event: MouseEvent) => {
			if (!asideRef.current) return;

			if (!asideRef.current.contains(event.target as Node)) {
				setIsOpen((prev) => !prev);
			}
		};

		window.addEventListener('mousedown', onOutsideClick);
		return () => window.removeEventListener('mousedown', onOutsideClick);
	}, [isOpen]);

	const toggleOpen = () => {
		setIsOpen((prev) => !prev);
	};
	const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.optionChange(optionList);
	};
	const onFormReset = () => {
		setOptionList(defaultArticleState);
		props.optionChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={asideRef}>
				<form className={styles.form} onSubmit={onFormSubmit}>
					<Text size={31} weight={800} uppercase align={'left'}>
						задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						options={fontFamilyOptions}
						selected={optionList.fontFamilyOption}
						onChange={(fontFamily) => {
							setOptionList({ ...optionList, fontFamilyOption: fontFamily });
						}}
					/>
					<RadioGroup
						name={'fontSize'}
						title={'размер шрифта'}
						options={fontSizeOptions}
						selected={optionList.fontSizeOption}
						onChange={(fontSize) => {
							setOptionList({
								...optionList,
								fontSizeOption: fontSize,
							});
						}}
					/>
					<Select
						title={'цвет шрифта'}
						options={fontColors}
						selected={optionList.fontColor}
						onChange={(fontColor) => {
							setOptionList({ ...optionList, fontColor: fontColor });
						}}
					/>
					<Separator />
					<Select
						title={'цвет фона'}
						options={backgroundColors}
						selected={optionList.backgroundColor}
						onChange={(backgroundColor) => {
							setOptionList({
								...optionList,
								backgroundColor: backgroundColor,
							});
						}}
					/>
					<Select
						title={'ширина контента'}
						options={contentWidthArr}
						selected={optionList.contentWidth}
						onChange={(contentWidth) => {
							setOptionList({ ...optionList, contentWidth: contentWidth });
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onFormReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

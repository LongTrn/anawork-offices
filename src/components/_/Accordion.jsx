import React, { useState, useEffect, } from 'react';
import { FETCH_OFFICES_LIST, FETCH_OFFICES_DETAIL, SET_OFFICES_TOTAL } from '../../redux/_/offices/officesActionTypes';
import "../../styles/_/Accordion.scss"
import { useDispatch, useSelector, } from "react-redux"
import { OfficesTypesIcon, } from "../../models/index"
import styled from "styled-components"

function AccordionItem({id, title, icon, button, content, ...props}) {

	return (
		<div className="offices-accordion__item">
			<AccordionItemTitle id={id} is_office={props.is_office} title={props.name} item={props} isParent/>
		</div>
	)
}

function AccordionItemTitle({id, is_office, button, icon, title, item, isChild = false, level = 1}) {
	
	const { folderId, data, size, collection, } = useSelector(state => state.offices)
	const [collapsed, setCollapsed] = useState(true)
	const [visited, setVisited] = useState(false)
	const dispatch = useDispatch();
	const current = collection && collection.find(office => office.id === id)
	const customIcon = collection && current && OfficesTypesIcon.find(type => type.office_type_id === current.office_type_id)

	const TreeNode = styled.div`
		padding-left: ${props => modifyPaddingLeft(props.level, props.is_office, props.isChild)}px !important;
	`

	const modifyPaddingLeft = (level, is_office, isChild) => {
		
		return (is_office || isChild ) && level * 20;
	}

	const handleAction = () => setCollapsed(prev => !prev)
	const onDetail = (id) => {
		dispatch({type: FETCH_OFFICES_DETAIL, payload: { input : { id }}})
	}
	const onListOffices = async (id) => {

		dispatch({type: FETCH_OFFICES_LIST, payload: {input: { id, index: 1, size, }}})
		return
	}

	useEffect(() => {}, [collapsed,])
	useEffect(() => {}, [collection])

	
	useEffect(() => {
		setVisited(prev => false)
		console.log(data.id)
		if (data.id === id) {

			setVisited(prev => true)
		}
		else if (folderId  === id && data.id === undefined) {

			setVisited(prev => true)
		}
		else setVisited(prev => false)
	}, [ data, folderId, ])

	return (
		<>
			<div className="offices-accordion__item__block">
				<TreeNode 
					level={level} 
					is_office={is_office}
					isChild={isChild}
					className={
						((is_office) ? " offices-accordion__item__title--padding-left " : "") + 
						(visited ? "offices-accordion__item__title--visited" : "") +
						" offices-accordion__item__title "}>
						{is_office? null : 
							(<div className="offices-accordion__item__title__button" onClick={() => is_office || handleAction()}>
								{button || !collapsed? (<i className="bi bi-chevron-down"></i>): (<i className="bi bi-chevron-right"></i>)}
							</div>)
						}
						<div className="offices-accordion__item__title__info" onClick={() => item.is_office ? onDetail(id) : onListOffices(id)}>
							<div className="offices-accordion__item__title__icon">{icon || (<div className={customIcon && customIcon.value + " offices-accordion__item__title__icon__svg "}/>)}</div>
							<div className="offices-accordion__item__title__text"><span>{title || "title"}</span></div>
						</div>
				</TreeNode>
				{(item.children !== undefined) && (<div className={collapsed? "offices-accordion__item__content": "offices-accordion__item__content offices-accordion__item__content--show"}>
					{
						(item.children.length > 0 && item.children.map(region => 
							(<><AccordionItemTitle key={region.id} id={region.id} is_office={region.is_office} title={region.name} item={region} isChild={true} level={level + 1}/></>)
						))
					}
				</div>)}
			</div>
		</>
	)
}

export default function Accordion({ children, }) {

	return (
		<div className="offices-accordion">
			{children?
				children.map(child => (<AccordionItem id={child.id} title={child.name} {...child}/>))
				: 
				<div className="offices-accordion__no-content">
					Không có dữ liệu
				</div>
			}
		</div>
	)
}

export { AccordionItem } 
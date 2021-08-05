import React, { useState, useEffect, } from 'react';
import { FETCH_OFFICES_LIST, FETCH_OFFICES_DETAIL, SET_OFFICES_TOTAL } from '../../redux/_/offices/officesActionTypes';
import "../../styles/_/Accordion.scss"
import { useDispatch, useSelector, } from "react-redux"
import { OfficesTypesIcon, } from "../../models/index"

function AccordionItem({id, title, icon, button, content, ...props}) {

	return (
		<div className="offices-accordion__item">
			<AccordionItemTitle id={id} is_office={props.is_office} title={props.name} item={props} isParent/>
		</div>
	)
}

function AccordionItemTitle({id, is_office, button, icon, title, item, isParent = false, isChild = "", level = 1}) {
	
	const { folderId, data, size, collection, } = useSelector(state => state.offices)
	const [collapsed, setCollapsed] = useState(true)
	const [visited, setVisited] = useState(false)
	const dispatch = useDispatch();
	const classNameIsChild = " offices-accordion__item__title--is-child "
	const current = collection && collection.find(office => office.id === id)
	const customIcon = collection && current && OfficesTypesIcon.find(type => type.office_type_id === current.office_type_id)

	const handleAction = () => setCollapsed(prev => !prev)
	const onDetail = (id) => {
		dispatch({type: FETCH_OFFICES_DETAIL, payload: { input : { id }}})
	}
	const fectchData = async (id) => {

		dispatch({type: FETCH_OFFICES_LIST, payload: {input: { id, index: 1, size, }}})
		return
	}

	useEffect(() => {}, [collapsed,])
	useEffect(() => {}, [collection])
	// useEffect(() => {setVisited(prev => id === folderId)}, [ folderId ])
	// useEffect(() => {setVisited(prev => id === data.id)}, [ data ])
	useEffect(() => {setVisited(prev => false)}, [ data, folderId, ])
	
	useEffect(() => {
		setVisited(prev => false)
		if (folderId  === id) {

			setVisited(prev => true)
		}
		else if (data.id === id) {

			setVisited(prev => true)
		}
		else setVisited(prev => false)
	}, [ data, folderId, ])

	return (
		<>
			<div className="offices-accordion__item__block">
				<div 
				aria-level={level} 
				className={((is_office) ? " offices-accordion__item__title--padding-left " : "") + ((isParent) ? "" : isChild && isChild + classNameIsChild) + " offices-accordion__item__title "}>
				{/* className={((is_office) ? " offices-accordion__item__title--padding-left " : "") + ((isParent) ? "" : isChild && isChild + classNameIsChild) + (visited && " offices-accordion__item__title--modified ") + " offices-accordion__item__title "}> */}
					{is_office? null : 
						(<div className="offices-accordion__item__title__button" onClick={() => is_office || handleAction()}>
							{button || !collapsed? (<i className="bi bi-chevron-down"></i>): (<i className="bi bi-chevron-right"></i>)}
						</div>)
					}
					<div className="offices-accordion__item__title__info" onClick={() => item.is_office ? onDetail(id) : fectchData(id)}>
						<div className="offices-accordion__item__title__icon">{icon || (<div className={customIcon && customIcon.value + " offices-accordion__item__title__icon__svg "}/>)}</div>
						<div className="offices-accordion__item__title__text"><span>{title || "title"}</span></div>
					</div>
				</div>
				{(item.children !== undefined) && (<div className={collapsed? "offices-accordion__item__content": "offices-accordion__item__content offices-accordion__item__content--show"}>
					{
						(item.children.length > 0 && item.children.map(region => 
							(<><AccordionItemTitle key={region.id} id={region.id} is_office={region.is_office} title={region.name} item={region} isChild={classNameIsChild} level={level + 1}/></>)
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
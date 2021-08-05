import React, { useState, useEffect, } from 'react';
import { FETCH_OFFICES_DETAIL } from '../../redux/_/offices/officesActionTypes';
import "../../styles/_/Accordion.scss"
import { useDispatch, useSelector, } from "react-redux"
import { OfficesTypesIcon, } from "../../models/index"

function AccordionItem({id, title, icon, button, content, ...props}) {

	return (
		<div className="offices-accordion__item">
			<AccordionItemTitle id={id} is_office={props.is_office} title={props.name} item={props} />
		</div>
	)
}

function AccordionItemTitle({id, is_office, button, icon, title, item, isChild = ""}) {
	
	const { collection, } = useSelector(state => state.offices)
	const [collapsed, setCollapsed] = useState(true)
	const dispatch = useDispatch();
	const classNameIsChild = " offices-accordion__item__title--is-child "
	const current = collection.find(office => office.id === id)
	const customIcon = collection && OfficesTypesIcon.find(type => type.office_type_id === current.office_type_id)
	
	const handleAction = () => setCollapsed(prev => !prev)
	const onDetail = (id) => {
		dispatch({type: FETCH_OFFICES_DETAIL, payload: { input : { id }}})
	}

	useEffect(() => {}, [collapsed,])
	
	useEffect(() => {console.log("icon ", customIcon, collection.find(office => office.id === id))}, [collection])

	return (
		<> 
			<div className={((!isChild) ? "" : isChild + classNameIsChild)  + " offices-accordion__item__title"}>
				{/* <div className={((!isChild) ? "" : classNameIsChild) + " offices-accordion__item__title"}> */}
					<div className="offices-accordion__item__title__button" onClick={() => is_office || handleAction()}>
						{is_office? null : 
						(button || 
							!collapsed? (<i className="bi bi-chevron-down"></i>): (<i className="bi bi-chevron-right"></i>)
						)}
						</div>
					<div className="offices-accordion__item__title__info" onClick={() => !item.is_office || onDetail(id)}>
						<div className="offices-accordion__item__title__icon">{icon || (<div className={customIcon.value + " offices-accordion__item__title__icon__svg "}/>)}</div>
						<div className="offices-accordion__item__title__text">{title || "title"}</div>
					</div>
				{/* </div> */}
			</div>

			{(item.children !== undefined) && (<div className={collapsed? "offices-accordion__item__content": "offices-accordion__item__content offices-accordion__item__content--show"}>
				{
					(item.children.length > 0 && item.children.map(region => 
						(<AccordionItemTitle key={region.id} id={region.id} is_office={region.is_office} title={region.name} item={region} isChild={classNameIsChild}/>)
					))
				}
			</div>)}
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
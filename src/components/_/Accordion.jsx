import React, { useState, useEffect, } from 'react';
import { FETCH_OFFICES_DETAIL } from '../../redux/_/offices/officesActionTypes';
import "../../styles/_/Accordion.scss"
import { useDispatch, } from "react-redux"

function AccordionItem({id, title, icon, button, content, ...props}) {

	return (
		<div className="offices-accordion__item">
			<AccordionItemTitle id={id} is_office={props.is_office} title={props.name} item={props} />
		</div>
	)
}

function AccordionItemTitle({id, is_office, button, icon, title, item}) {
	
	const [collapsed, setCollapsed] = useState(true)
	const dispatch = useDispatch();
	const handleAction = () => setCollapsed(prev => !prev)
	const onDetail = (id) => {
		dispatch({type: FETCH_OFFICES_DETAIL, payload: { input : { id }}})
	}
	useEffect(() => {console.log(item)}, [collapsed,])

	return (
		<>
			<div className={((!item.parent_id) ? "":"offices-accordion__item__title--is-child" )+ " offices-accordion__item__title"}>
				<div className="offices-accordion__item__title__button" onClick={() => is_office || handleAction()}>
					{is_office? null : 
					(button || 
						!collapsed? (<i className="bi bi-chevron-down"></i>): (<i className="bi bi-chevron-right"></i>)
					)}
					</div>
				<div className="offices-accordion__item__title__info" onClick={() => !item.is_office || onDetail(id)}>
					<div className="offices-accordion__item__title__icon">{icon || (<div className="offices-accordion__item__title__icon__svg"/>)}</div>
					<div className="offices-accordion__item__title__text">{title || "title"}</div>
				</div>
			</div>
			{(item.children !== undefined) && (<div className={collapsed? "offices-accordion__item__content": "offices-accordion__item__content offices-accordion__item__content--show"}>
				{
					(item.children.length > 0 && item.children.map(region => 
						(<AccordionItemTitle key={region.id} id={region.id} is_office={region.is_office} title={region.name} item={region}/>)
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
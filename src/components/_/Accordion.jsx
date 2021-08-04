import React, { useState, useEffect, } from 'react';
import "../../styles/_/Accordion.scss"

function recursion ( office, ) {
	console.log("Recursion", office)
	if (!office) return;
	if (!office.children) return (<AccordionItemTitle is_office={office.is_office} title={office.name} />);
	if (office.children.length <= 0) return;

	return office.children.map(region => 
		(<AccordionItemTitle is_office={region.is_office} title={region.name}>
			
		</AccordionItemTitle>)
	)
}

function AccordionItem({title, icon, button, content, ...props}) {

	const renderContent = recursion(props)

	// useEffect(() => {}, [props])

	return (
		<div className="offices-accordion__item">
			<AccordionItemTitle is_office={props.is_office} title={props.name}>
				{renderContent}
			</AccordionItemTitle>
		</div>
	)
}

function AccordionItemTitle({is_office, button, icon, title, ...props}) {
	
	const [collapsed, setCollapsed] = useState(true)
	const handleAction = () => setCollapsed(prev => !prev)

	useEffect(() => {}, [collapsed,])

	return (
		<>
			<div className="offices-accordion__item__title">
				<div className="offices-accordion__item__title__button" onClick={() => is_office || handleAction()}>{is_office? null : (button || (<i className="bi bi-chevron-down"></i>))}</div>
				<div className="offices-accordion__item__title__icon">{icon || (<div className="offices-accordion__item__title__icon__svg"/>)}</div>
				<div className="offices-accordion__item__title__text">{title || "title"}</div>
			</div>
			<div className={collapsed? "offices-accordion__item__content": "offices-accordion__item__content offices-accordion__item__content--show"}>
				{props.children}
			</div>
		</>
	)
}

export default function Accordion({ children, }) {

	return (
		<div className="offices-accordion">
			{children?
				// children.map(child => {
				// 	console.log(child)
				// 	return (<AccordionItem title={child.name} {...child}/>)
				// })
				children.map(child => (<AccordionItem title={child.name} {...child}/>))
				// null
				: null
			}
		</div>
	)
}

export { AccordionItem } 
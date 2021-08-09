import React from 'react';
import { AccordionItemTitle } from "../index"
import "../../styles/_/Accordion.scss"

export default function AccordionItem({id, title, icon, button, content, ...props}) {
	return (
		<div className="offices-accordion__item">
			<AccordionItemTitle id={id} is_office={props.is_office} title={props.name} item={props} isParent/>
		</div>
	)
}
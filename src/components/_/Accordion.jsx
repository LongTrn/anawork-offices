import React from 'react';
import { AccordionItem, } from "../index"
import "../../styles/_/Accordion.scss"

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
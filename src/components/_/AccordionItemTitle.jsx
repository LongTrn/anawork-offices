import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector, } from "react-redux"
import { OfficesTypesIcon, } from "../../models/index"
import { AccordionNode, } from "../../styled/index"
import { getCustomIcon, } from "../../actions/_/functions"
import { fetchOfficesList, fetchOfficesDetail, } from "../../actions/_/dispatch"
import "../../styles/_/Accordion.scss"

export default function AccordionItemTitle({ id, is_office, button, icon, title, item, isChild = false, level = 1 }) {

	const { folderId, data, size, collection, } = useSelector(state => state.offices)
	const [collapsed, setCollapsed] = useState(true)
	const [visited, setVisited] = useState(false)
	const iconClass = getCustomIcon(id, is_office, collection, OfficesTypesIcon)

	const dispatch = useDispatch();
	const handleAction = () => setCollapsed(prev => !prev)
	const onDetail = (id) => {
		dispatch(fetchOfficesDetail(id))
	}
	const onListOffices = async (id) => {
		dispatch(fetchOfficesList(1, size, id))
		return
	}

	useEffect(() => { }, [collection])
	useEffect(() => {
		if (data.id === id) setVisited(prev => true)
		else if (folderId === id && data.id === undefined) setVisited(prev => true)
		else setVisited(prev => false)
	}, [data, folderId,])

	return (
		<div className="offices-accordion__item__block">
			<AccordionNode
				level={level}
				is_office={is_office}
				isChild={isChild}
				className={
					((is_office) ? " offices-accordion__item__title--padding-left " : "") +
					(visited ? "offices-accordion__item__title--visited" : "") +
					" offices-accordion__item__title "}>
				{is_office ? null :
					(<div className="offices-accordion__item__title__button" onClick={() => is_office || handleAction()}>
						{button || !collapsed ? (<i className="bi bi-chevron-down"></i>) : (<i className="bi bi-chevron-right"></i>)}
					</div>)
				}
				<div className="offices-accordion__item__title__info" onClick={() => item.is_office ? onDetail(id) : onListOffices(id)}>
					<div className="offices-accordion__item__title__icon">{icon || (<div className={iconClass + " offices-accordion__item__title__icon__svg "} />)}</div>
					<div className="offices-accordion__item__title__text"><span>{title || "title"}</span></div>
				</div>
			</AccordionNode>
			{(item.children !== undefined) && (<div className={collapsed ? "offices-accordion__item__content" : "offices-accordion__item__content offices-accordion__item__content--show"}>
				{
					(item.children.length > 0 && item.children.map(region =>
						(<><AccordionItemTitle key={region.id} id={region.id} is_office={region.is_office} title={region.name} item={region} isChild={true} level={level + 1} /></>)
					))
				}
			</div>)}
		</div>
	)
}
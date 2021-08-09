import React from 'react';
import "../../styles/_/OfficesFolders.scss"
import { Accordion, } from "../index"

export default function OfficesFoldersBody ({folders}) {

	return (
		<div className="offices-folders__body">
			<div className="offices-folders__body__search-bar">
				<input type="text" className="offices-folders__body__search-bar__field" placeholder="Tìm kiếm..."/>
			</div>
			<div className="offices-folders__body__folders">
				{folders.length > 0 ?
					(<Accordion children={folders}/>)
					:
					(<div className="offices-folders__body__folders__no-content">Không có danh sách</div>)
				}
			</div>
		</div>
	)
}
import React from 'react';
import "../../styles/_/Header.scss"

export default function Header({ main, sub, flag = false , link = false}) {

	const classHeader = flag? "offices-header offices-header--margin": "offices-header"
	return (
		<div className={classHeader}>
			<div className="offices-header--wrapper">
				<div className="offices-header__item">
					<span className="text-nowrap offices-header__main"><b>{main}</b></span>
				</div>
				{sub&&(
					<>
						<div className="text-nowrap offices-header__item offices-header__item__sub">
							<span className="offices-header__item__sub__line"> </span>
						</div>
						<div className="text-nowrap offices-header__item offices-header__item__sub">
							<span className="offices-header__item__sub__text">{sub}</span>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
export const modifyPaddingLeft = (level, is_office, isChild) => {
	return (is_office || isChild ) && level * 20;
}

export const getCustomIcon = (id, is_office, collection, iconsCollection) => {
	
	const current = collection && collection.find(office => office.id === id)
	const icon = collection && current && iconsCollection.find(type => type.office_type_id === current.office_type_id)
	return (icon ? ((icon && (is_office && !icon.office_type_id)) ? "" : icon.value) : "")
}
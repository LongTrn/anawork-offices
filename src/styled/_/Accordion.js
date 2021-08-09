import styled from "styled-components"
import { modifyPaddingLeft, } from "../../actions/_/functions"

export const AccordionNode = styled.div`
padding-left: ${props => modifyPaddingLeft(props.level, props.is_office, props.isChild)}px !important;
`
import styled from "styled-components";
import {Badge} from "react-bootstrap";
import {Card, CardFoot} from "../../components/common/CardCustom";
import ReportIcon from "@material-ui/icons/Report";
import {theme} from "../../util/theme";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

export const NewsCoverLayout = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    height: 18vh;
    min-height: 180px;
  }
`

export const ImageDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  height: 150px;
  width: 100%;

  @media only screen and (min-width: 768px) {
    height: 100%;
    width: 30%;
  }
`

export const ImageCustom = styled.img`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 100%;
  width: 100%;
  object-fit: cover;

  @media only screen and (min-width: 768px) {
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }
`

export const ImageInfoBgBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  margin: 0;
  padding: 5%;
  height: 2rem;
  width: 100%;
  position: absolute;
  bottom: 0;
  font-size: 0.8em;
`

export const ImageInfoBgTop = styled(ImageInfoBgBottom)`
  top: 0;
  justify-content: center;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  font-size: 1.2rem;

  @media only screen and (min-width: 768px) {
    border-top-right-radius: 5px;
  }
`

export const BadgeCustom = styled(Badge)`
  margin-left: auto;
`

export const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media only screen and (min-width: 768px) {
    width: 70%;
    height: 100%;
  }
`

export const CardCustom = styled(Card)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin-bottom: 0;

  @media only screen and (min-width: 768px) {
    height: 100%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
  }
`

export const NewsTitle = styled.b`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const CardFootCustom = styled(CardFoot)`
  display: none;

  @media only screen and (min-width: 768px) {
    display: flex;
  }
`

export const ReportIconCustom = styled(ReportIcon)`
  font-size: 1.4rem;
  border: white 1px solid;
  border-radius: 5px;

  :hover {
    color: ${theme.colors.navbar};
    border: white 1px solid;
    background: white;
    cursor: pointer;
`

export const ArrowDropUpIconCustom = styled(ArrowDropUpIcon)`
  font-size: 1.4rem;
  border: white 1px solid;
  border-radius: 5px;

  :hover {
    color: ${theme.colors.navbar};
    border: white 1px solid;
    background: white;
    cursor: pointer;
`
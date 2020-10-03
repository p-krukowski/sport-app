import React, {Component} from 'react';
import {addComment} from "../../util/apiUtils/CommentUtils";
import PostAddIcon from "@material-ui/icons/PostAdd";
import styled from "styled-components";
import {theme} from "../../util/theme";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import {InputTextArea, InputUrl} from "../common/Input";

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMinLengthInfo: false,
      imageUrl: null,
      showImageUrlField: false,
      show: this.props.show
    }
  }

  addComment = () => {
    const comment = {
      value: document.getElementById('commentInput').value,
      imageUrl: this.state.imageUrl
    }
    if (comment.value.length > 10) {
      addComment(comment, this.props.entryId)
      .then(response => {
        this.props.showToast();
        this.props.updateComments();
        this.setState({
          show: false
        })
      });
    } else {
      this.setState({
        showMinLengthInfo: true
      })
    }
  }

  showImageUrlField = () => {
    if (!this.state.showImageUrlField) {
      this.setState({
        showImageUrlField: true
      })
    } else {
      this.setState({
        showImageUrlField: false,
        imageUrl: null
      })
    }
  }

  addImageUrl = () => {
    this.setState({
      imageUrl: document.getElementById('imageUrlInput').value
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.show !== prevProps.show) {
      this.setState({
        show: this.props.show
      })
    }
  }

  render() {
    return (
        this.state.show &&
        <NewCommentLayout>
          <CommentInputSection>
            <CommentInput id='commentInput'
                          type='textarea'
                          maxLength='2000'/>
            {
              this.state.showMinLengthInfo &&
              <text style={{color: 'red', marginTop: '5px'}}>
                Komentarz musi mieć co najmniej 10 znaków
              </text>
            }
            {
              this.state.showImageUrlField &&
              <ImageUrlInput id='imageUrlInput'
                             placeholder="link do zdjęcia"
                             onChange={this.addImageUrl}/>
            }
          </CommentInputSection>
          <Options>
            <TextEdition>
              <FormatBoldIconCustom/>
              <FormatItalicIconCustom/>
              <EditorButton>( ͡° ͜ʖ ͡°)</EditorButton>
              <EditorButton>spoil</EditorButton>
              <FormatQuoteIconCustom/>
              <AddAPhotoIconCustom onClick={() => this.showImageUrlField()}/>
              <InsertLinkIconCustom/>
            </TextEdition>
            <InputButton onClick={this.addComment}>
              Skomentuj
              <PostAddIcon style={{marginLeft: '0.8rem'}}/>
            </InputButton>
          </Options>
        </NewCommentLayout>
    );
  }
}

export default NewComment;

const NewCommentLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background: ${theme.colors.navbar};
  margin-bottom: 10px;
  
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const CommentInputSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const CommentInput = styled(InputTextArea)`
  min-height: 6rem;
  background: ${theme.colors.background};
    
  @media only screen and (min-width: 768px) {
    margin-right: 10px;
  }
`

const ImageUrlInput = styled(InputUrl)`
  margin: 5px 0;
  resize: none;
  
  @media only screen and (min-width: 768px) {
    margin: 10px 10px 0 0;
  }
`

const Options = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const TextEdition = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

const InputButton = styled.button`
  border: 1px solid white;
  color: white;
  font-size: 1rem !important;
  background: none;
  border-radius: 5px;
  padding: 5px 5px;
  transition: color .1s, background .1s;
  
  :hover {
    color: ${theme.colors.navbar};
    background: white;
  }
  :focus {
    outline: none;
  }
  
  @media only screen and (min-width: 768px) {
    padding: 10px 5px;
  }
`

//Icons Customization

const EditorButton = styled.b`
  background: ${theme.colors.background};
  border-radius: 3px;
  padding: 5px;
  margin: 2px;
  font-size: 1rem;
  transition: background .2s;
  
  :hover {
    background: gray;
    cursor: pointer;
  }
`
const FormatBoldIconCustom = styled(FormatBoldIcon)`
  font-size: 2rem !important;
  background: ${theme.colors.background};
  border-radius: 3px;
  padding: 5px;
  margin: 2px;
  transition: background .2s;
  
  :hover {
    background: gray;
    cursor: pointer;
  }
`
const FormatItalicIconCustom = styled(FormatItalicIcon)`
  font-size: 2rem !important;
  background: ${theme.colors.background};
  border-radius: 3px;
  padding: 5px;
  margin: 2px;
  transition: background .2s;
  
  :hover {
    background: gray;
    cursor: pointer;
  }
`
const FormatQuoteIconCustom = styled(FormatQuoteIcon)`
  font-size: 2rem !important;
  background: ${theme.colors.background};
  border-radius: 3px;
  padding: 5px;
  margin: 2px;
  transition: background .2s;
  
  :hover {
    background: gray;
    cursor: pointer;
  }
`
const AddAPhotoIconCustom = styled(AddAPhotoIcon)`
  font-size: 2rem !important;
  background: ${theme.colors.background};
  border-radius: 3px;
  padding: 5px;
  margin: 2px;
  transition: background .2s;
  
  :hover {
    background: gray;
    cursor: pointer;
  }
`
const InsertLinkIconCustom = styled(InsertLinkIcon)`
  font-size: 2rem !important;
  background: ${theme.colors.background};
  border-radius: 3px;
  padding: 5px;
  margin: 2px;
  transition: background .2s;
  
  :hover {
    background: gray;
    cursor: pointer;
  }
`
import React, {Component} from "react";
import styled from "styled-components";
import {theme} from "../../util/theme";

import AddCommentIcon from '@material-ui/icons/AddComment';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import {Toast} from "react-bootstrap";
import {addNewsComment} from "../../util/apiUtils/NewsUtils";

class NewNewsComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      showMinLengthInfo: false
    }
  }

  addNewsComment = () => {
    const comment = {
      value: document.getElementById('commentInput').value,
      imageUrl: null
    }
    if (comment.value.length > 10) {
      addNewsComment(this.props.newsId, comment)
      .then(response => {
        this.setState({
          showToast: true
        });
      }).catch(error => {
        alert("error");
      })
    } else {
      this.setState({
        showMinLengthInfo: true
      })
    }

  }

  hideToast = () => {
    this.setState({
      showToast: false
    })
  }

  render() {
    return (
        <NewNewsCommentLayout>
          <CommentInputSection>
            <CommentInput id='commentInput'
                          type='textarea'
                          maxLength='2000'
                          placeholder='Skomentuj...'/>
            {
              this.state.showMinLengthInfo &&
              <text style={{color: 'red', marginTop: '5px'}}>Komenarz musi mieć co najmniej 10 znaków</text>
            }
          </CommentInputSection>
          <Options>
            <TextEdition>
              <FormatBoldIconCustom/>
              <FormatItalicIconCustom/>
              <EditorButton>( ͡° ͜ʖ ͡°)</EditorButton>
              <EditorButton>spoil</EditorButton>
              <FormatQuoteIconCustom/>
              <AddAPhotoIconCustom/>
              <InsertLinkIconCustom/>
            </TextEdition>
            <InputButton onClick={this.addNewsComment}>
              Dodaj komentarz
              <AddCommentIcon style={{marginLeft: '0.8rem'}}/>
            </InputButton>
          </Options>

          <Toast show={this.state.showToast}
                 onClose={this.hideToast}
                 delay={10000}
                 autohide
                 style={{
                   position: 'fixed',
                   bottom: '10px',
                   left: '10px',
                   width: '12%',
                   color: 'black'
                 }}>
            <Toast.Header>
              <strong className="mr-auto">SportApp</strong>
              <small>teraz</small>
            </Toast.Header>
            <Toast.Body>Dodano komentarz: {this.state.value}</Toast.Body>
          </Toast>
        </NewNewsCommentLayout>
    );
  }
}

export default NewNewsComment;

const NewNewsCommentLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 6rem;
  padding: 10px 0 30px 0;
  border-bottom: 1px solid ${theme.colors.background};
  
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
`

const CommentInputSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const CommentInput = styled.textarea`
  display: flex;
  height: 100%;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  padding: 10px 10px;
  
  :focus {
    outline: none;
  }
`

const Options = styled.div`
  height: 5rem;;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TextEdition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const InputButton = styled.button`
  height: 50%;
  border: 1px solid white;
  color: white;
  font-size: 1rem !important;
  background: none;
  border-radius: 5px;
  transition: color .1s, background .1s;
  
  :hover {
    color: ${theme.colors.navbar};
    background: white;
  }
  :focus {
    outline: none;
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
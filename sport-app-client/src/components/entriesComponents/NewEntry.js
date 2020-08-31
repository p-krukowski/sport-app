import React, {Component} from "react";
import styled from "styled-components";
import {theme} from "../../util/theme";

import PostAddIcon from '@material-ui/icons/PostAdd';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import {Toast} from "react-bootstrap";
import {addEntry} from "../../util/apiUtils/EntriesUtils";

class NewEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      showMinLengthInfo: false,
      imageUrl: null,
      showImageUrlField: false
    }
  }

  addEntry = () => {
    const entry = {
      value: document.getElementById('entryInput').value,
      imageUrl: this.state.imageUrl
    }
    if (entry.value.length > 10) {
      addEntry(entry)
      .then(response => {
        this.props.getEntries();
        document.getElementById('entryInput').value = '';
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

  showImageUrlField = () => {
    if (this.state.showImageUrlField === false) {
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

  render() {
    return (
        <NewEntryLayout>
          <CommentInputSection>
            <CommentInput id='entryInput'
                          type='textarea'
                          maxLength='2000'/>
            {
              this.state.showMinLengthInfo &&
              <text style={{color: 'red', marginTop: '5px'}}>Wpis musi mieć co
                najmniej 10 znaków</text>
            }
            {
              this.state.showImageUrlField &&
              <ImageUrlInput id='imageUrlInput' onChange={this.addImageUrl}/>
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
            <InputButton onClick={this.addEntry}>
              Dodaj wpis
              <PostAddIcon style={{marginLeft: '0.8rem'}}/>
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
                   color: 'black',
                   zIndex: 2
                 }}>
            <Toast.Header>
              <strong className="mr-auto">SportApp</strong>
              <small>teraz</small>
            </Toast.Header>
            <Toast.Body>Dodano wpis</Toast.Body>
          </Toast>
        </NewEntryLayout>
    );
  }
}

export default NewEntry;

const NewEntryLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background: ${theme.colors.navbar};
  margin-bottom: 10px;
`

const CommentInputSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const CommentInput = styled.textarea`
  border: none;
  min-height: 6rem;
  display: flex;
  height: 100%;
  border-radius: 5px;
  margin-right: 10px;
  padding: 10px;
  background: ${theme.colors.background};
  
  :focus {
    outline: none;
    background: ${theme.colors.background};
    border: none;
    color: white;
  }
`

const ImageUrlInput = styled.input`
  border: none;
  border-radius: 5px;
  margin: 10px 10px 0 0;
  padding: 10px;
  background: ${theme.colors.background};
  
  :focus {
    outline: none;
    color: white;
  }
`

const Options = styled.div`
  height: 100%;
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
  border: 1px solid white;
  color: white;
  font-size: 1rem !important;
  background: none;
  border-radius: 5px;
  padding: 10px 5px;
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
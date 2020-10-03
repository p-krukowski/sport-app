import React, {Component} from "react";
import styled from "styled-components";
import {theme} from "../../util/theme";

import PostAddIcon from '@material-ui/icons/PostAdd';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import {addEntry} from "../../util/apiUtils/EntriesUtils";
import ToastCustom from "../common/Toast";

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
          <EntryInputSection>
            <EntryInput id='entryInput'
                          type='textarea'
                          maxLength='2000'/>
            {
              this.state.showMinLengthInfo &&
              <text style={{color: 'red', marginTop: '5px'}}>
                Wpis musi mieć co najmniej 10 znaków
              </text>
            }
            {
              this.state.showImageUrlField &&
              <ImageUrlInput id='imageUrlInput'
                             placeholder="link do zdjęcia"
                             onChange={this.addImageUrl}/>
            }
          </EntryInputSection>
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

          <ToastCustom show={this.state.showToast}
                 onClose={this.hideToast}
                 delay={10000}
                 autohide>
            <ToastCustom.Header style={{color: 'white', background: theme.colors.navbar}}>
              <strong className="mr-auto">SportApp</strong>
              <small>teraz</small>
            </ToastCustom.Header>
            <ToastCustom.Body>Dodano wpis</ToastCustom.Body>
          </ToastCustom>
        </NewEntryLayout>
    );
  }
}

export default NewEntry;

const NewEntryLayout = styled.div`
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

const EntryInputSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const EntryInput = styled.textarea`
  border: none;
  min-height: 6rem;
  display: flex;
  height: 100%;
  border-radius: 5px;
  padding: 10px;
  background: ${theme.colors.background};
  
  :focus {
    outline: none;
    background: ${theme.colors.background};
    border: none;
    color: white;
  }
  
  @media only screen and (min-width: 768px) {
    margin-right: 10px;
  }
`

const ImageUrlInput = styled.input`
  border: none;
  border-radius: 5px;
  margin: 5px 0;
  padding: 10px;
  background: ${theme.colors.background};
  
  :focus {
    outline: none;
    color: white;
  }
  
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
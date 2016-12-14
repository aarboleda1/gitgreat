import React from 'react';
class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrls: []
    }
  }
  displayPhotos() {
    console.log('hit displayPhotos function');
    // // ajax get request from server with correct route
    //     // remember to make a new route
    var photoLinks = []
    $.get('/displayImages', function(data) {
      data.forEach(function(el) {
        console.log(el.url);
        photoLinks.push(el.url);
      });
      this.setState({
        photoUrls: photoLinks
      });
      console.log(this.state.photoUrls);
      // console.log(photoUrls);
    //   console.log('tessstt:'); //not showing up
    //   this.render();
    }.bind(this));
  }
  uploadFile(e) {
    e.preventDefault();
    var formData = new FormData();
    // var files = document.getElementById('imageUpload').files;
    var files = $('input[type=file]')[0].files[0];
    console.log(files);
    console.log('files: ', files);
    // formData.append('name', files[0].name);
    formData.append('imageFile', files);
    // formData.append('username', 'wells');
    console.log('files[0]:, ', files);
    console.log('formData: ', formData.entries());
    // for(var pair of formData.entries()) {
    //   console.log(pair);
    // }
    $.ajax({
      url: '/uploadImage',
      type: 'POST',
      data: formData,
      processData: false, // tells jQuery not to process data
      contentType: false, // tells jQuery not to set contentType
      success: () => {
        console.log('post request successful and saved to db!');
        this.displayPhotos();
      }
    });
    // console.log('files here: ', files);
    // for(var i = 0; i < files.length; i++) {
    //   // var fileObject = {};
    //   // fileObject.filename = files[i].name;
    //   // fileObject.filesize = files[i].size;
    //   // fileObject.filetype = files[i].type;
    //   console.log(files[i]);
    //   var reader = new FileReader();
    //   reader.onload = (e) => {
    //     console.log('successfully loaded file!!!');
    //     // console.log('fileobject: ', fileObject);
    //     console.log('event: ', e);
    //     // fileObject.filedata = e.target.result;
    //     $.ajax({
    //       type: 'POST',
    //       url: '/uploadImage',
    //       data: JSON.stringify(e.target.result),
    //       success: () => {
    //         console.log('post request successful and saved to db!');
    //         this.displayPhotos();
    //       }
    //     });
    //   }
    //   reader.readAsDataURL(files[i]);
    // }
  }
  render() {
    console.log('calls render');
    this.displayPhotos();
    return (<div>Photos Tab Stuff Here
              <form method="post" encType="multipart/form-data" id="uploadForm">
                <input type="file" id="imageUpload" accept="image/*" multiple /><br/>
                <input type="submit" value="submit" onClick={(e) => this.uploadFile(e)}/>
              </form>
              {this.state.photoUrls.map(link => <img src={link} />)}
            </div>);
  }
}
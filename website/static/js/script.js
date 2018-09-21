(function() {
  const PREVIEW_SERVER = 'https://caravaggio.now.sh';
  const PREVIEW_IMAGE = 'https://ramiel.gitlab.io/caravaggio/docs/assets/example/girls.jpeg';

  document.addEventListener("DOMContentLoaded", function(event) { 

    const previewCode = document.querySelectorAll('code[data-preview]');
    previewCode.forEach(code => {
      const previewImage = code.getAttribute('data-previewimage');
      const previewOptions = code.getAttribute('data-previewoptions');
      const options = code.querySelector('strong');
      const link = `${PREVIEW_SERVER}/${previewOptions || options.innerText}/${previewImage || PREVIEW_IMAGE}`;
      const a = document.createElement('a');
      a.setAttribute('target', '_blank');
      a.setAttribute('href', link);
      a.innerText = 'Try it';
      code.parentElement.append(a);
    })
    // console.log(previewCode);

    // /**
    //  * Preview link
    //  * Show preview image for each "try it" link
    //  */
    // const previewLinks = document.querySelectorAll('pre > a');
    // previewLinks.forEach(link => {
    //   let image;
    //   // const url = link.getAttribute('href');
    //   const url = 'https://caravaggio.now.sh/rs_600/https://ramiel.gitlab.io/caravaggio/docs/assets/example/girls.jpeg'
    //   link.addEventListener('mouseover', () => {
    //     image = document.createElement('img');
    //     image.setAttribute('src', url);
    //     link.parentElement.append(image);
    //   });
    //   link.addEventListener('mouseleave', () => {
    //     image && image.remove();
    //   });
    // });
  });
})();

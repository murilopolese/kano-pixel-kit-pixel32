class DocsComponent extends BaseElement {
    template() {
        return `
<style>
:host {
    display: block;
    height: auto;
    position: relative;
    font-family: Monaco, monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 18px;
    line-height: 1.5em;
}
::slotted {
    font-family: Monaco, monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

::slotted(code),
::slotted(pre) {
    font-family: Monaco, monospace;
    font-size: 16px;
    font-weight: bold;
    background: #272822;
    color: #A6E22E;
    border-radius: 5px;
    line-height: 1em;
}
::slotted(code) {
    padding: 1px 3px;
}
::slotted(pre) {
    padding: 12px;
}
::slotted(h1),
::slotted(h2) {
    margin: 1.5em 0 1.5em 0;
}
::slotted(h1) {
    color: #F92672
}
::slotted(h2) {
    color: #FD971F;
}
::slotted(#connecting),
::slotted(#pixel-turtle),
::slotted(#pixel-kit),
::slotted(#programming-in-python) {
    height: 40px;
}

a:link, a:visited, a:hover, a:active {
    font-weight: bold;
    color: #66D9EF;
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}
#menu {
    position: fixed;
    top: 0;
    background: #272822;
    width: 800px;
    padding: 20px 0;
}
#menu a:first-child {
    margin-left: 20px;
}
#content {
    padding: 20px 40px;
}
</style>
<div id="menu">
    <a href="#connecting">Connecting</a> -
    <a href="#pixel-turtle">Pixel Turtle</a> -
    <a href="#pixel-kit">Pixel Kit</a> -
    <a href="#programming-in-python">Python</a>
</div>
<div id="content">
    <slot></slot>
</div>
`
    }
}
customElements.define('pixel32-docs', DocsComponent)

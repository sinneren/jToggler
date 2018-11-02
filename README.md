# jToggler
## jQuery toggler plugin
Simple jQuery plugin that generate toggle switcher from checkboxes.
At first, include jtoggler.js and jtoggler.styles.css in project.

You must use class name *jtoggler* for checkboxes:
`<input type="checkbox" class="jtoggler">`

For initialization use:
```javascript
$('.jtoggler').jtoggler();
```

For using labels add to input data-attribute: `data-jtlabel="Your text label"`

## Events

After toggling on document object triggered event `jt:toggled` with additional parameter named *target*
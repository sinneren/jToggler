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

For using labels add to input data-attribute: `data-jtlabel="Your text label"`. If You need changeable label add `data-jtlabel-success="Toggler on label"`.

If You want to use three-state toggler just add `data-jtmulti-state` attribute to checkbox. If You want use it with disabled add *disabled* attribute to checkbox.

If you add new toggler to DOM you must run init() to reinit items.

## Events

After toggling on document object triggered event `jt:toggled` with additional parameter named *target*.

After toggling 3-state on document object triggered event `jt:toggled:multi` with additional parameter named *target*.
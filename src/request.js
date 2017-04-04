export default function request() {
  return new Promise(function(resolve, reject) {
    resolve(resources);
  });
}

const resources = [{
  "label": "Garage Door",
  "widgets": [{
    "type": "poll-state",
    "fetch": {
      "method": "POST",
      "url": "http://garage:4000/digital_read/4",
      "timeout": 5000
    },
    "map": {
      "0": "Closed",
      "1": "Open"
    }
  }, {
    "type": "button",
    "label": "Activate",
    "confirm": {
      "title": "Safety Check",
      "template": "Are you sure it is safe to activate the garage door?",
      "okText": "Yes. Do it."
    },
    "trigger": {
      "method": "POST",
      "url": "http://garage:4000/digital_write/18/1/then/0/800",
      "timeout": 5000
    }
  }]
}, {
  "label": "Cameras",
  "widgets": [{
    "type": "image",
    "src": "http://cam0:8080/"
  }, {
    "type": "modal",
    "label": "Events",
    "url": "http://lab:8001/events-modal.html"
  }]
}, {
  "label": "SATA Switcher",
  "widgets": [{
    "type": "poll-state",
    "fetch": {
      "method": "GET",
      "url": "http://sata-relay/status",
      "timeout": 5000
    },
    "map": {
      "0": "PC is ON",
      "1": "PC is OFF"
    }
  }, {
    "type": "button",
    "label": "Use Windows",
    "confirm": {
      "title": "Confirm",
      "template": "Are you sure? Nothing happens if the PC is on",
      "okText": "Yes. Do it."
    },
    "trigger": {
      "method": "POST",
      "url": "http://sata-relay/main",
      "timeout": 5000
    }
  }, {
    "type": "button",
    "label": "Use Linux",
    "confirm": {
      "title": "Confirm",
      "template": "Are you sure? Nothing happens if the PC is on",
      "okText": "Yes. Do it."
    },
    "trigger": {
      "method": "POST",
      "url": "http://sata-relay/alt",
      "timeout": 5000
    }
  }]
}]

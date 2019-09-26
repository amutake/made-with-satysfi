#!/bin/bash

set eux -o pipefail

node csv2md.js > table.md
sed -e "/%%%TABLE%%%/r table.md" -e "/%%%TABLE%%%/d" README.md.template > README.md
# origin-node
Classes for controlling OriginLab instances using OLE Automation

# The goal
This project aims to make functionality of OriginLab OLE objects (as described in https://www.originlab.com/doc/COM/Classes) usable directly from Node JS, allowing editing most objects, manipuating data and re-exporting of layers. When using other scientific software as well, this allows transparent updates in one application whenever a file is changed in another application.

# How
Under the hood, OLE objects are created using the `winax` (`node-activex`) library and wrapped using the `OLEContainer` class, which most other classes inherit from. They then implement the class functionality using async functions and add further helpful methods, e.g. for finding worksheets by long name.

Type conversion will be handled by `winax` most of the time; unless otherwise stated, it should be fine.

# Getting started
The main entry point for manipulating OriginLab is the `Application` class, or more importantly, the inheriting classes `ApplicationSI` (using a running OriginLab instance) and `ApplicationCOMSI` (using a newly created instance).  

Following code illustrates usage for searching a worksheet by `LongName` and updating the formula for the second column

```
import {ApplicationSI} from "origin-node";

... in an async context:

// Connects to an existing OriginLab session
let app = new ApplicationSI();

let worksheet = await App.FindWorksheetByLongname("r-01_FeW_Si-1_4MeV#1.dat");
if (worksheet) {
    console.log("Worksheet found!");
    await worksheet.Execute('csetvalue col:=2 formula:="5,34848*A+13,03793";');
}
```

## Getters & Setters
To keep the wrappers independent of the underlying OLE library, the decision was made to use async functions as consistently as possible.

However, while async getters (a.k.a. `await worksheet.LongName`) are possible in JavaScript, there is no such syntax for async setters. Therefore, separate methods for setters are added using `${propertyName}Set` as naming scheme.

Example usage: `await Worksheet.${propertyName}Set (newValue)`.

# Status
Certain array-like structures will not be implemented and are skipped from the following list (e.g. `WorksheetPages`).

## Partly implemented
- Application
- ApplicationCOMSI
- ApplicationSI
- DataObject
- DataObjectBase
- DataPlot
- Datasheet
- Column
- GraphLayer
- GraphPage
- LayoutPage
- Layer
- MatrixPage
- OriginBase (missing Parent)
- TreeNode
- Worksheet
- WorksheetPage
- Page
- PageBase
## Pending
- CollectionsBase
- DataRange
- ExternalDialogPage
- Folder
- MatrixObject
- MatrixSheet
- Note
- ProjectInfo
# Completed
- OriginObject
- TreeNode
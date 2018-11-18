# Code Jam Initializer

## What is this?
This is a command line tool that generates a directory with a subfolder for each problem to be solved for a Google Code Jam round. Each problem subfolder contains a JavaScript starter file set up to read in an input file and generate an output file (currently hardcoded to handle one type of input format). The `solution.js` file is intended to be modified by the user to the specs of each code jam problem. This tool is primarily helpful in creating the folders for organizational purposes.

## To install

Clone the repo. Run `npm install -g --prefix </path/where/you/keep/npm/globals>`

## To use
On the command line, navigate to a directory where you want to generate code jam files and enter
`jam-init --type <type> --round <round> --year <year> [--num <num>]`

#### Parameters
`type` is the type of code jam, such as "kickstart"  
`round` is the code jam round, such as "g"  
`year` is the year of the code jam, such as "2018"  
`num` is the number of problems in the code jam, defaults to 3  

#### Example
`jam-init --type kickstart --round g --year 2018`  

generates:
```
code-jam-kickstart-g-2018
  problem_1
      solution.js
  problem_2
      solution.js
  problem_3
      solution.js
```

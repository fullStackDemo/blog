#!/bin/bash

echo "Starting script $0"

display_usage() {
  echo
  echo "Usage: $0"
  echo
  echo " -h, --help   Display usage instructions"
  echo " -p, --print  Print welcome message"
  echo
}
print_message() {
  echo
  echo "Welcome to Bash case statements!"
  echo
}

raise_error() {
  local error_message="$@"
  echo "${error_message}" 1>&2;
}

argument="$1"

if [[ -z $argument ]] ; then
  raise_error "Expected argument to be present"
  display_usage
else 
  case $argument in
    -h|--help)
      display_usage
      ;;
    -p|--print)
      print_message
      ;;
    *)
    raise_error "Unknown argument: ${argument}"
      display_usage
      ;;
  esac
fi


echo "Finished script $0"

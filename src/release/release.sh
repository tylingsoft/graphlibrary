# Fail on error
set -e
[ -n "$DEBUG"] && set -x

bail() {
    echo $1 >&2
    exit 1
}

# Initial config
PROJECT=$1
PROJECT_ROOT=`pwd`
PAGES_DIR=/tmp/$PROJECT-pages
DIST_DIR=$2

# Preflight checks
[ -n "$PROJECT" ] || bail "No project name was specified."
[ -n "$DIST_DIR" ] || bail "No dist dir was specified."
[ "`git rev-parse HEAD`" = "`git rev-parse master`" ] || [ -n "$PRE_RELEASE" ] || bail "ERROR: You must release from the master branch"
[ -z "`git status --porcelain`" ] || bail "ERROR: Dirty index on working tree. Use git status to check"

regexp="^master$|^dev$|^release\/[0-9]+\.[0-9]+\.[0-9]+$|^(feature|fix|experimental|chore|proposal|hotfix|temporal)\/((OPS|TDS|PGS|TF|ZP)-[0-9]+)?([-?a-z0-9]+)?$"
localBranchName="$(git rev-parse --abbrev-ref HEAD)"

YELLOW='\033[1;33m'
NO_COLOR='\033[0m'

if [[ ! "$localBranchName" =~ $regexp ]]
then
  echo "${YELLOW}🤖 The branch name does not follow the standard 🤖${NO_COLOR}"
fi
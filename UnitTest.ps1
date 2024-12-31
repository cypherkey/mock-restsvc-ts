
$users = Invoke-RestMethod -Method GET -Uri "http://localhost:3000/api/v1/users"
$users

$user1 = Invoke-RestMethod -Method GET -Uri "http://localhost:3000/api/v1/users/$($users[0].id)"
$user1

$body = [pscustomobject]@{ firstname = "Test"; lastname = "User"; gender = "male"; active = $true }
$body
$user2 = Invoke-RestMethod -Method POST -Uri "http://localhost:3000/api/v1/users" -Headers @{ "Content-Type" = "application/json"; "Accepts" = "application/json" } -Body $( $body | ConvertTo-Json )
$user2

$body.firstname = "Updated"
$body
$user3 = Invoke-RestMethod -Method PUT -Uri "http://localhost:3000/api/v1/users/$($user2.id)" -Headers @{ "Content-Type" = "application/json"; "Accepts" = "application/json" } -Body $( $body | ConvertTo-Json )
$user3

$user4 = Invoke-RestMethod -Method GET -Uri "http://localhost:3000/api/v1/users/$($user2.id)"
$user4



$groups = Invoke-RestMethod -Method GET -Uri "http://localhost:3000/api/v1/groups"
$groups

$group1 = Invoke-RestMethod -Method GET -Uri "http://localhost:3000/api/v1/groups/$($groups[0].id)"
$group1

$body = [pscustomobject]@{ name = "Developers"; active = $true }
$body
$group2 = Invoke-RestMethod -Method POST -Uri "http://localhost:3000/api/v1/groups" -Headers @{ "Content-Type" = "application/json"; "Accepts" = "application/json" } -Body $( $body | ConvertTo-Json )
$group2

$body.active = $false
$body
$group3 = Invoke-RestMethod -Method PUT -Uri "http://localhost:3000/api/v1/groups/$($group2.id)" -Headers @{ "Content-Type" = "application/json"; "Accepts" = "application/json" } -Body $( $body | ConvertTo-Json )
$group3

$group4 = Invoke-RestMethod -Method GET -Uri "http://localhost:3000/api/v1/groups/$($group2.id)"
$group4



$members = Invoke-RestMethod -Method GET -Uri "http://localhost:3000/api/v1/members"
$members

$member1 = Invoke-RestMethod -Method GET -Uri "http://localhost:3000/api/v1/members/$($members[0].id)"
$member1

$body = [pscustomobject]@{ user_id = $user2.id; group_id = $group2.id }
$body
$member2 = Invoke-RestMethod -Method POST -Uri "http://localhost:3000/api/v1/members" -Headers @{ "Content-Type" = "application/json"; "Accepts" = "application/json" } -Body $( $body | ConvertTo-Json )
$member2

$members = Invoke-RestMethod -Method GET -Uri "http://localhost:3000/api/v1/members"
$members
Invoke-RestMethod -Method DELETE -Uri "http://localhost:3000/api/v1/groups/$($group2.id)" -Headers @{ "Content-Type" = "application/json"; "Accepts" = "application/json" }
$members = Invoke-RestMethod -Method GET -Uri "http://localhost:3000/api/v1/members"
$members

Invoke-RestMethod -Method DELETE -Uri "http://localhost:3000/api/v1/users/$($user2.id)" -Headers @{ "Content-Type" = "application/json"; "Accepts" = "application/json" }
Invoke-RestMethod -Method DELETE -Uri "http://localhost:3000/api/v1/members/$($member2.id)" -Headers @{ "Content-Type" = "application/json"; "Accepts" = "application/json" }

## __New Features__

- Reworked/Finished the Match view! Now, when clicking on a match, it will show all the information properly sorted, and in addition it will also display the stats of individual rounds!

- You can now see your last 5 searched players on the player search page! Clicking on one of these tiles will load their player profile and display it as usual.

## __Bugfixes__

- Fixed a bug that showed the wrong bundle price in the store.

- Fixed a visual bug that misaligned the RR gain of on a player profile.

- Fixed a bug that prevented you from going back to a players profile when viewing a math they played.

- Fixed a bug that prevented the single skin prices from being shown when looking at a single skin.

- Fixed a bug that would prevent you from logging in with your Riot Account because a few files were missing. These will now properly be created on startup.

- Fixed a bug that prevented you from creating/editing custom themes.

- Fixed a visual bug that still showed the loading circle on the player search page when not entering a "#" for the Riot tag.

## __Everything Else__

- Reworked the way VALTracker loads the Map images for both the Favorite Matches and the player profiles. (Switched from local images that had to be updated manually to an API call that returnes the images)

- Moved all pages into their own directory because I got annoyed by the messy structure of the GitHub Repo.

- Fixed a LOT of vulneralbilities that VALTracker was facing because of outdated NodeJS Modules. (My bad on that front)
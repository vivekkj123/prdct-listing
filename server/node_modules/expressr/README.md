# Express Request Parser

This handy middleware:

* parses multipart requests,

* parses json requests,

* parses urlencoded requests,

* adds a bunch of useful methods to coerce request parameters:

    * `req.getString` retrieves a string (or an empty string if no parameter found)
    * `req.getStrings` retrieves an array of strings (or an empty array if no parameter found)
    * `req.getInteger` retrieves an integer (or 0 if not an integer)
    * `req.getIntegers` retrieves an array of integers (skipping non-integers)
    * `req.getNumber` retrieves a number (or 0 if not an number)
    * `req.getNumbers` retrieves an array of numbers (skipping non-numbers)
    * `req.getMoment` parses a string date in `YYYY-MM-DD` format (or default value)
    * `req.getMoments` parses an array of moment dates (skipping invalid ones)
    * `req.getFile` retrieves a file parsed from multipart form
    * `req.getFiles` retrieves an array of files

Each file is represented by an object with following keys:

  * `name` — original filename as submitted by user with slashes and semicolons removed;
  * `safeName` — filename converted to ASCII to be safely stored in virtually any FS;
  * `type` — value of `Content-Type` header as submitted by browser;
  * `path` — path to temporary storage so that you could move it to its final place with `fs.rename(file.path, destination, cb)`.


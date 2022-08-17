# This file copies pull path of pg to clipboard.
# This will help you while running sql files when setting up db.

# NOTE: MAKE SURE YOU HAVE CLIPBOARD LIB. INSTALLED

import clipboard, os
clipboard.copy(os.path.abspath(os.path.join(__file__, os.pardir)).replace("\\", "/"))

'use strict'

import os from 'os'

class CpuInfo {
  getCpuInfo () {
    return os.cpus()
  }
}

export default CpuInfo

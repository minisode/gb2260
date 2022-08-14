require 'json'
require 'pathname'

require 'gb2260/version'
require 'gb2260/division'

module GB2260
  @@store = {}

  module_function

  def [](code)
    {
      code: code.to_i,
      name: @@store[code.to_s]
    }
  end

  def divisions
    @@store.keys.map { |code| Division.new(code) }
  end

  def load_file!(path)
    @@store = JSON.load(Pathname(path).read)
  end

  class << self
    alias_method :all, :divisions
  end
end
